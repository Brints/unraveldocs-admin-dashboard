import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface OtpGenerateRequest {
  length: number;
  count: number;
}

interface OtpGenerateResponse {
  statusCode: number;
  status: string;
  message: string;
  data: string[];
}

interface ActiveOtp {
  id: string;
  otpCode: string;
  createdAt: string;
  expiresAt: string;
  isUsed: boolean;
  usedAt?: string;
}

interface ActiveOtpsResponse {
  statusCode: number;
  status: string;
  message: string;
  data: ActiveOtp[];
}

interface GeneratedOtpBatch {
  id: string;
  otps: string[];
  length: number;
  count: number;
  generatedAt: Date;
  copiedAll: boolean;
}

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);
  private readonly API_URL = environment.apiUrl;

  // Expose Math for template
  Math = Math;

  otpForm: FormGroup;
  isGenerating = signal(false);
  isLoadingActiveOtps = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  generatedBatches = signal<GeneratedOtpBatch[]>([]);
  activeOtps = signal<ActiveOtp[]>([]);
  copiedOtps = signal<Set<string>>(new Set());

  // Pagination
  currentPage = signal(1);
  itemsPerPage = 5;

  constructor() {
    this.otpForm = this.fb.group({
      length: [6, [Validators.required, Validators.min(4), Validators.max(10)]],
      count: [3, [Validators.required, Validators.min(1), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.fetchActiveOtps();
  }

  fetchActiveOtps(): void {
    this.isLoadingActiveOtps.set(true);

    this.http.get<ActiveOtpsResponse>(`${this.API_URL}/admin/active-otps`)
      .subscribe({
        next: (response) => {
          this.isLoadingActiveOtps.set(false);
          this.activeOtps.set(response.data);
          this.currentPage.set(1); // Reset to first page
        },
        error: (error) => {
          this.isLoadingActiveOtps.set(false);
          console.error('Failed to fetch active OTPs:', error);
        }
      });
  }

  generateOtps(): void {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    this.isGenerating.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const request: OtpGenerateRequest = this.otpForm.value;

    this.http.post<OtpGenerateResponse>(`${this.API_URL}/admin/generate-otp`, request)
      .subscribe({
        next: (response) => {
          this.isGenerating.set(false);
          this.successMessage.set(response.message);

          // Add new batch to the beginning of the list
          const newBatch: GeneratedOtpBatch = {
            id: this.generateId(),
            otps: response.data,
            length: request.length,
            count: request.count,
            generatedAt: new Date(),
            copiedAll: false
          };

          this.generatedBatches.update(batches => [newBatch, ...batches]);

          // Fetch updated active OTPs
          this.fetchActiveOtps();

          // Clear success message after 3 seconds
          setTimeout(() => this.successMessage.set(null), 3000);
        },
        error: (error) => {
          this.isGenerating.set(false);
          const errorMsg = error.error?.message || 'Failed to generate OTPs. Please try again.';
          this.errorMessage.set(errorMsg);
        }
      });
  }

  copyOtp(otp: string): void {
    navigator.clipboard.writeText(otp).then(() => {
      this.copiedOtps.update(copied => new Set(copied).add(otp));

      // Remove from copied set after 2 seconds
      setTimeout(() => {
        this.copiedOtps.update(copied => {
          const newSet = new Set(copied);
          newSet.delete(otp);
          return newSet;
        });
      }, 2000);
    });
  }

  copyAllOtps(batch: GeneratedOtpBatch): void {
    const allOtps = batch.otps.join('\n');
    navigator.clipboard.writeText(allOtps).then(() => {
      // Mark batch as copied
      this.generatedBatches.update(batches =>
        batches.map(b => b.id === batch.id ? { ...b, copiedAll: true } : b)
      );

      // Reset copied status after 2 seconds
      setTimeout(() => {
        this.generatedBatches.update(batches =>
          batches.map(b => b.id === batch.id ? { ...b, copiedAll: false } : b)
        );
      }, 2000);
    });
  }

  exportOtps(batch: GeneratedOtpBatch): void {
    const content = batch.otps.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `otps_${batch.generatedAt.getTime()}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  deleteBatch(batchId: string): void {
    this.generatedBatches.update(batches =>
      batches.filter(b => b.id !== batchId)
    );
  }

  clearAllBatches(): void {
    if (confirm('Are you sure you want to clear all generated OTP batches?')) {
      this.generatedBatches.set([]);
      this.copiedOtps.set(new Set());
    }
  }

  isOtpCopied(otp: string): boolean {
    return this.copiedOtps().has(otp);
  }

  getTimeSince(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour${Math.floor(seconds / 3600) > 1 ? 's' : ''} ago`;
    return `${Math.floor(seconds / 86400)} day${Math.floor(seconds / 86400) > 1 ? 's' : ''} ago`;
  }

  getTimeUntilExpiry(expiresAt: string): string {
    const expiryDate = new Date(expiresAt);
    const now = new Date();
    const seconds = Math.floor((expiryDate.getTime() - now.getTime()) / 1000);

    if (seconds <= 0) return 'Expired';
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
    return `${Math.floor(seconds / 86400)}d`;
  }

  isExpired(expiresAt: string): boolean {
    return new Date(expiresAt).getTime() <= new Date().getTime();
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  get totalOtpsGenerated(): number {
    return this.activeOtps().length;
  }

  get activeOtpsCount(): number {
    return this.activeOtps().filter(otp => !otp.isUsed && !this.isExpired(otp.expiresAt)).length;
  }

  get usedOtpsCount(): number {
    return this.activeOtps().filter(otp => otp.isUsed).length;
  }

  get expiredOtpsCount(): number {
    return this.activeOtps().filter(otp => !otp.isUsed && this.isExpired(otp.expiresAt)).length;
  }

  // Pagination computed properties
  get paginatedOtps(): ActiveOtp[] {
    const startIndex = (this.currentPage() - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.activeOtps().slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.activeOtps().length / this.itemsPerPage);
  }

  get hasNextPage(): boolean {
    return this.currentPage() < this.totalPages;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage() > 1;
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage.update(page => page + 1);
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.currentPage.update(page => page - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage.set(page);
    }
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage();
    const pages: number[] = [];

    if (total <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (current > 3) {
        pages.push(-1); // Ellipsis
      }

      // Show pages around current page
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (current < total - 2) {
        pages.push(-1); // Ellipsis
      }

      // Always show last page
      pages.push(total);
    }

    return pages;
  }
}


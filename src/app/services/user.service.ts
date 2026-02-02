import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

/**
 * Injectable service available globally
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Inject HttpClient for API calls
  private http = inject(HttpClient);

  /**
   * rxResource creates a reactive resource
   * It automatically handles:
   * - loading
   * - error
   * - refresh
   * - signal updates
   */
  usersResource = rxResource({
    loader: () =>
      this.http.get<any[]>('https://jsonplaceholder.typicode.com/users'),
  });
}

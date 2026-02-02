import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,

  // Standalone components must declare their imports
  imports: [CommonModule],

  templateUrl: './users.component.html',
})
export class UsersComponent {
  // Inject UserService using new inject() API
  private userService = inject(UserService);

  /**
   * users signal computed from rxResource
   * value() returns the current resource data
   */
  users = computed(() => this.userService.usersResource.value());

  /**
   * loading state from resource
   */
  loading = computed(() => this.userService.usersResource.isLoading());

  /**
   * error state from resource
   */
  error = computed(() => this.userService.usersResource.error());

  /**
   * Reload API call manually
   */
  reload() {
    this.userService.usersResource.reload();
  }
}

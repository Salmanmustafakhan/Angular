import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { rxResource } from '@angular/core/rxjs-interop';
import { GET_USERS, CREATE_USER } from '../graphql/user.graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * UserService connects Angular with Spring Boot GraphQL backend
 * using Apollo Client and rxResource with Signals.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Inject Apollo GraphQL client
  private apollo = inject(Apollo);

  /**
   * ============================
   * USERS RESOURCE (QUERY)
   * ============================
   */
  usersResource = rxResource({
    loader: () =>
      this.apollo
        .query<{
          users: { id: string; name: string; email: string }[];
        }>({
          query: GET_USERS,
          fetchPolicy: 'network-only',
        })
        .pipe(
          /**
           * map transforms Apollo result safely.
           * result.data may be undefined, so we guard it.
           */
          map(result => result.data?.users ?? [])
        ),
  });

  /**
   * ============================
   * CREATE USER (MUTATION)
   * ============================
   */
  createUser(
    name: string,
    email: string
  ): Observable<{ id: string; name: string; email: string } | undefined> {
    return this.apollo
      .mutate<{
        createUser: { id: string; name: string; email: string };
      }>({
        mutation: CREATE_USER,
        variables: { name, email },
      })
      .pipe(
        /**
         * After mutation, reload resource and return data safely.
         */
        map(result => {
          this.usersResource.reload();
          return result.data?.createUser;
        })
      );
  }
}

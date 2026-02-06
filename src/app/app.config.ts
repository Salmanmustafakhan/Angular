import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloClientOptions } from '@apollo/client/core';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // ✅ Router configuration
    provideRouter(routes),

    // ✅ HttpClient with fetch for SSR
    provideHttpClient(withFetch()),

    /**
     * ============================
     * APOLLO GRAPHQL PROVIDER
     * ============================
     */
    provideApollo((): ApolloClientOptions => {
      const httpLink = inject(HttpLink);

      return {
        cache: new InMemoryCache(),

        // Transport layer for GraphQL over HTTP
        link: httpLink.create({
          uri: 'http://localhost:8080/graphql',
        }),

        // Default fetch policies (SSR friendly)
        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'network-only',
          },
          query: {
            fetchPolicy: 'network-only',
          },
        },
      };
    }),
  ],
};

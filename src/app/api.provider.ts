import { BASE_PATH } from './api/v1/variables';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Configuration } from './api/v1';
import { provideHttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// export function withBackendApiConfiguration(
//   configurationParameters: ConfigurationParameters = {}
// ): Configuration {
//   return new Configuration({
//     // any default parameters
//     // basePath: 'my-default-api',
//     // overrides
//     ...configurationParameters,
//   });
// }

export function provideApi(
  withConfiguration?: Configuration
): EnvironmentProviders {
  return makeEnvironmentProviders([
    // { provide: Configuration, useValue: withConfiguration },
    { provide: BASE_PATH, useValue: 'http://' + environment.tabletIP },
    provideHttpClient(),
  ]);
}

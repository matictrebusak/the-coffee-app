import { BASE_PATH } from './api/v1/variables';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Configuration, ConfigurationParameters } from './api/v1';
import { provideHttpClient } from '@angular/common/http';
import { CONFIG } from './config/config';

export function withBackendApiConfiguration(
  configurationParameters: ConfigurationParameters = {}
): Configuration {
  return new Configuration({
    // any default parameters
    // basePath: 'my-default-api',
    // overrides
    ...configurationParameters,
  });
}

export function provideApi(
  withConfiguration?: Configuration
): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: Configuration, useValue: withConfiguration },
    { provide: BASE_PATH, useValue: CONFIG.TABLET_IP },
    provideHttpClient(),
  ]);
}

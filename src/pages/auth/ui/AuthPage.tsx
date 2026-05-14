import React from 'react';
import { useLoginForm } from '../../../features/auth-by-email';
import { GlobalHeader } from '../../../widgets/global-header';

export function AuthPage(): JSX.Element {
  const { email, setEmail, password, setPassword, errors, isLoading, handleSubmit } = useLoginForm();

  return (
    <>
      <GlobalHeader />
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>

              {errors.length > 0 && (
                <ul className="error-messages">
                  {errors.map((error: string) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              )}

              <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

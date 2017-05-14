package gr.bus_tracker.driver_app.auth;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.support.annotation.Nullable;

/**
 * Created by nick on 5/14/17.
 */

public class AuthenticatorService extends Service {
	// Instance field that stores the authenticator object
	private Authenticator mAuthenticator;
	@Override
	public void onCreate() {
		// Create a new authenticator object
		mAuthenticator = new Authenticator(this);
	}

	/**
   * When the system binds to this Service to make the RPC call
   * return the authenticator's IBinder.
   */
	@Nullable
	@Override
	public IBinder onBind(Intent intent) {
		return mAuthenticator.getIBinder();
	}
}

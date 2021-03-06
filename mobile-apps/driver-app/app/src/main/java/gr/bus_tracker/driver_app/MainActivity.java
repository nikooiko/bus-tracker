package gr.bus_tracker.driver_app;

import android.accounts.Account;
import android.accounts.AccountManager;
import android.content.ContentResolver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;

import gr.bus_tracker.driver_app.auth.LoginActivity;
import gr.bus_tracker.driver_app.core.BaseActivity;

public class MainActivity extends BaseActivity {

	// Constants
	// The authority for the sync adapter's content provider
	public static final String AUTHORITY = "gr.bus_tracker.driver_app.provider";
	// An account type, in the form of a domain name
	public static final String ACCOUNT_TYPE = "example.com";
	// Account
	public static final String ACCOUNT = "default_account";
	// Sync interval constants
	public static final long SECONDS_PER_MINUTE = 60L;
	public static final long SYNC_INTERVAL_IN_MINUTES = 60L;
	public static final long SYNC_INTERVAL = SYNC_INTERVAL_IN_MINUTES * SECONDS_PER_MINUTE;
	// Global variables
	// A content resolver for accessing the provider
	ContentResolver mResolver;

	// Instance fields
	Account mAccount;

	public MainActivity() {
		super(R.layout.activity_main);
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		// Create the dummy account  // TODO this

//		mAccount = CreateSyncAccount(this);

		// Get the content resolver for your app
//		mResolver = getContentResolver();

		/*
	   * Turn on periodic syncing
	   */
//		ContentResolver.addPeriodicSync(mAccount, AUTHORITY, Bundle.EMPTY, SYNC_INTERVAL);

		// TODO later on check if already logged in.
		Intent intent = new Intent(this, LoginActivity.class);
		startActivity(intent);
	}

	/**
	 * Create a new dummy account for the sync adapter
	 *
	 * @param context The application context
	 */
	public static Account CreateSyncAccount(Context context) {
		// Create the account type and default account
		Account newAccount = new Account(ACCOUNT, ACCOUNT_TYPE);
		// Get an instance of the Android account manager
		AccountManager accountManager = (AccountManager) context.getSystemService(ACCOUNT_SERVICE);
		/*
		 * Add the account and account type, no password or user data
		 * If successful, return the Account object, otherwise report an error.
		 */
		if (accountManager.addAccountExplicitly(newAccount, null, null)) {
			/*
			 * If you don't set android:syncable="true" in
			 * in your <provider> element in the manifest,
			 * then call context.setIsSyncable(account, AUTHORITY, 1)
			 * here.
			 */
		} else {
      /*
       * The account exists or some other error occurred. Log this, report it,
       * or handle it internally.
       */
		}
		return newAccount;
	}
}

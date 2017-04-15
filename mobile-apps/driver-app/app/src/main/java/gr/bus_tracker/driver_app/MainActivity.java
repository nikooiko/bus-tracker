package gr.bus_tracker.driver_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import gr.bus_tracker.driver_app.auth.LoginActivity;

public class MainActivity extends AppCompatActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		// TODO later on check if already logged in.
		Intent intent = new Intent(this, LoginActivity.class);
		startActivity(intent);
	}
}

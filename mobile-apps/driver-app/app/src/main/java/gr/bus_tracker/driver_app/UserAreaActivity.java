package gr.bus_tracker.driver_app;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;

public class UserAreaActivity extends AppCompatActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_user_area);

		final TextView tvWelcome = (TextView) findViewById(R.id.tvWelcome);

		Intent intent = getIntent();
		String username = intent.getStringExtra("username");
		String message = "Hello " + username + "!";
		tvWelcome.setText(message);
	}
}

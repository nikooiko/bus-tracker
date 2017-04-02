package gr.bus_tracker.driver_app;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

public class RegisterActivity extends AppCompatActivity {

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_register);

		final EditText etUsername = (EditText) findViewById(R.id.etUsername);
		final EditText etPassword = (EditText) findViewById(R.id.etPassword);
		final EditText etRepeatPassword = (EditText) findViewById(R.id.etRepeatPassword);
		final Button btnRegister = (Button) findViewById(R.id.btnRegister);
	}
}

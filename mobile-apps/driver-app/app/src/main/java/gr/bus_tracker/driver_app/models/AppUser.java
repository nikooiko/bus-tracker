package gr.bus_tracker.driver_app.models;

import com.google.android.gms.maps.model.LatLng;
import com.strongloop.android.loopback.User;

import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Created by nick on 4/2/17.
 */

public class AppUser extends User {
	public static String NAME = "AppUser";

	private LatLng location;
	private ArrayList<String> roles;
	private String username;

	public LatLng getLocation() {
		return location;
	}

	public void setLocation(LatLng location) {
		this.location = location;
	}

	public ArrayList<String> getRoles() {
		return roles;
	}

	public void setRoles(ArrayList<String> roles) {
		this.roles = roles;
	}

	public boolean hasRole(String sRole) {
		for (String role : roles) {
			if (role.equals(sRole)) return true;
		}
		return false;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public String getEmail() {
		return super.getEmail();
	}

	public String getPassword() {
		return super.getPassword();
	}
}

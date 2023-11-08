import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class App {
    public static void main(String[] args) {
        // Replace 'YOUR_API_KEY' with your actual Google Maps API key
        String apiKey = "AIzaSyB53FhhcHTSnbiIN_PyekEVvlcNhGPhxLA";

        // Replace 'YOUR_LOCATION' with the latitude and longitude of your current location
        String location = "35.2446,-3.9317";

        try {
            // Encode the location parameter
            location = URLEncoder.encode(location, "UTF-8");

            // Construct the API request URL
            String urlString = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + location + "&radius=1000&type=lodging&key=" + apiKey;
            URL url = new URL(urlString);

            // Open a connection to the URL
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // Set the request method to GET
            connection.setRequestMethod("GET");

            // Get the response code
            int responseCode = connection.getResponseCode();

            if (responseCode == 200) {
                // Read and process the response
                BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                StringBuilder response = new StringBuilder();

                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                reader.close();

                // Parse and work with the JSON response data as needed
                String jsonResponse = response.toString();
                System.out.println(jsonResponse);
            } else {
                System.out.println("Error: " + responseCode);
            }

            // Close the connection
            connection.disconnect();

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

// package com.harsha;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class InsuranceBackendApplication {

// 	public static void main(String[] args) {
// 		SpringApplication.run(InsuranceBackendApplication.class, args);
// 	}

// }

package com.harsha;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InsuranceBackendApplication {

    public static void main(String[] args) {
        // Load .env variables and set them as system properties
        Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        SpringApplication.run(InsuranceBackendApplication.class, args);
    }
}

(function () {
  emailjs.init("BnRoAjGd5ec2E2VQn");
})();

window.onload = function () {
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get 12 hr Format Time
    async function get12HourTime() {
      // Get the input value as a string
      const inputDateTime = document.getElementById("date_time").value;

      // Extract date part only (yyyy-mm-dd) from the datetime value
      var dateOnly = inputDateTime.split("T")[0];

      // Convert the input string to a Date object
      const inputDate = new Date(inputDateTime);

      // Get hours and minutes
      let hours = inputDate.getHours();
      let minutes = inputDate.getMinutes();

      // Determine AM/PM
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      hours = hours % 12;
      hours = hours ? hours : 12; // If hours is 0, set it to 12

      // Format the time
      const formattedTime = `${dateOnly} ${hours}:${
        minutes < 10 ? "0" + minutes : minutes
      } ${ampm}`;

      return formattedTime;
      //   // Display the result
      //   document.getElementById(
      //     "output"
      //   ).innerText = `Selected time in 12-hour format: ${formattedTime}`;
    }

    // Get IP Address
    async function getIpAddress() {
      try {
        const response = await fetch("https://api.ipify.org");
        const ip = await response.text();
        console.log(`IP: ${ip}`);
        return ip;
      } catch (error) {
        console.log(error);
        return null; // or throw error if you want to handle it differently
      }
    }

    // Send Mail
    async function sendEmail() {
      // Email template
      var templateParams = {
        user_name: document.getElementById("user_name").value,
        user_email: document.getElementById("user_email").value,
        contact_number: document.getElementById("contact_number").value,
        pickup_location: document.getElementById("pickup_location").value,
        date_time: await get12HourTime(),
        ip_address: await getIpAddress(),
      };

      emailjs.send("contact_service", "contact_form", templateParams).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Message Sent");
          document.getElementById("contact-form").reset();
          if (response.status === 200) {
            window.location.href = "/elixer/pages/thank-you.html";
          }
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Message Not Sent");
        }
      );
    }

    sendEmail();
  });

  // Modal
  document
    .getElementById("contact-form-modal")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      // Get 12 hr Format Time
      async function get12HourTime() {
        // Get the input value as a string
        const inputDateTime = document.getElementById("date_time_modal").value;

        // Extract date part only (yyyy-mm-dd) from the datetime value
        var dateOnly = inputDateTime.split("T")[0];

        // Convert the input string to a Date object
        const inputDate = new Date(inputDateTime);

        // Get hours and minutes
        let hours = inputDate.getHours();
        let minutes = inputDate.getMinutes();

        // Determine AM/PM
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // If hours is 0, set it to 12

        // Format the time
        const formattedTime = `${dateOnly} ${hours}:${
          minutes < 10 ? "0" + minutes : minutes
        } ${ampm}`;

        return formattedTime;
        //   // Display the result
        //   document.getElementById(
        //     "output"
        //   ).innerText = `Selected time in 12-hour format: ${formattedTime}`;
      }

      // Get IP Address
      async function getIpAddress() {
        try {
          const response = await fetch("https://api.ipify.org");
          const ip = await response.text();
          console.log(`IP: ${ip}`);
          return ip;
        } catch (error) {
          console.log(error);
          return null; // or throw error if you want to handle it differently
        }
      }

      // Send Mail
      async function sendEmail() {
        // Email template
        var templateParams = {
          user_name: document.getElementById("user_name_modal").value,
          user_email: document.getElementById("user_email_modal").value,
          contact_number: document.getElementById("contact_number_modal").value,
          pickup_location: document.getElementById("pickup_location_modal").value,
          date_time: await get12HourTime(),
          ip_address: await getIpAddress(),
        };

        emailjs.send("contact_service", "contact_form", templateParams).then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("Message Sent");
            document.getElementById("contact-form-modal").reset();
            if (response.status === 200) {
              window.location.href = "/elixer/pages/thank-you.html";
            }
          },
          function (error) {
            console.log("FAILED...", error);
            alert("Message Not Sent");
          }
        );
      }

      sendEmail();
      // redirect();
    });
};

# Management Service for Algonquin Pet Store

## **Management Service Overview**

This lab assignment involves developing the **Management Service** for the Algonquin Pet Store. The Management Service is a crucial component of the system, designed to handle incoming order messages via **RabbitMQ** and make them accessible through a **REST API** for the store-admin web application.

### **Functionality:**
- The service establishes a connection with RabbitMQ to receive real-time order messages generated by the store.
- Once the order messages are received, they are processed and stored, making them available for retrieval through a RESTful API.

### **12-Factor App Principles:**
The implementation of the Management Service adheres to the first four principles of the **12-Factor App** methodology, ensuring a robust and maintainable codebase:
1. **Codebase:** The Management Service has a single codebase tracked in a version control system (Git), ensuring consistent deployment across various environments.
2. **Dependencies:** All dependencies are explicitly declared and managed through the `package.json` file, allowing for easy installation and maintenance.
3. **Configuration:** Configuration settings, such as connection strings and environment variables, are stored separately from the code, facilitating secure and flexible deployments.
4. **Backing Services:** The service interacts with external backing services, specifically RabbitMQ, to process and manage order data seamlessly.

### **Implementation Overview:**
- The core logic is implemented in `index.js`, where the service connects to RabbitMQ, handles order messages, and provides a REST API for client applications to access order data.

This structure ensures that the Management Service is scalable, maintainable, and aligns with industry best practices for cloud-based applications.
## `index.js`

The main functionality of the Management Service is defined in this file. It establishes a connection with **RabbitMQ**, processes the incoming order messages, and offers a REST API for the store-admin web application to use the data.

The main functionality of the Management Service is defined in this file. It establishes a connection with **RabbitMQ**, processes the incoming order messages, and offers a REST API for the store-admin web application to access the data.

### **Implementation Overview:**

1. **Establish Connection to RabbitMQ:**
   - The service connects to the RabbitMQ server using the **amqplib** library. The connection string is fetched from the environment variable `RABBITMQ_URL`, allowing for easy configuration based on the deployment environment.

2. **Order Message Handling:**
   - The service listens for incoming order messages from RabbitMQ. When a message is received, it processes the order details and stores them in memory (or in a database, if implemented).

3. **REST API Setup:**
   - A **Node.js REST API** is created using the **Express.js** framework. The API exposes the following endpoints:
     - `GET /api/orders`: Retrieves all processed orders.

4. **Error Handling:**
   - The application includes error handling for both RabbitMQ connections and API requests, ensuring robustness and ease of debugging.

5. **Server Initialization:**
   - The server listens on the specified port (default is 3000) and logs a message to the console when it is up and running.

### Implementation Overview:

1. I installed the necessary dependencies to make RabbitMQ work and set up RabbitMQ in the `index.js` file using the **amqplib** library.
2. To manage the requests from the store-admin web application, a **Node.js REST API** framework was created.

## `test-api.http`

This file holds **HTTP requests** to use in testing the REST API endpoints. These requests mimic API calls to ensure that the Management Service is functioning as expected. For these tests, I employed the **REST Client** extension in Visual Studio Code to make API testing more manageable.

## **API Endpoints**

The Management Service exposes the following API endpoints to interact with the order data.

- Add your environment varible in deployment an add this in configration.

### **Base URL**
For local development:http://localhost:3000/api

After deployment: https://your-azure-webapp-url/api


### **1. Get All Orders**
- **Method:** `GET`
- **Endpoint:** `api/orders`
- **Description:** Retrieves all orders from RabbitMQ.

#### **Local Testing:**
```http
GET http://localhost:3000/api/orders
Accept: application/json
```

#### **Deployment Testing:**
```http
GET  https://<your-azure-webapp-url>/api/orders
Accept: application/json
```

## **Deployment Process**

### **Step 1: Set Up RabbitMQ on Azure VM**

1. **Create an Azure Virtual Machine (VM)**:
   - Go to the **Azure Portal** and create a new **Ubuntu Virtual Machine**.
   - Ensure that SSH is enabled for remote access.

2. **Install RabbitMQ on the VM**:
   - SSH into the VM:
     ```bash
     ssh <username>@<VM-IP-Address>
     ```
   - Update the VM and install RabbitMQ:
     ```bash
     sudo apt update
     sudo apt install rabbitmq-server -y
     ```
   - Start and enable RabbitMQ:
     ```bash
     sudo systemctl start rabbitmq-server
     sudo systemctl enable rabbitmq-server
     ```

3. **Open Required Ports**:
   - In the Azure portal, go to your VM's **Network Security Group (NSG)** and open inbound ports **5672** (RabbitMQ) and **15672** (RabbitMQ Management UI).

### **Step 2: Create an Azure Web App for the Management Service**

1. **Create a Web App**:
   - In **Azure Portal**, create a new **Web App**.
   - Choose **Node.js** as the runtime stack and ensure it's deployed in the same region as your VM.

2. **Configure Environment Variables**:
   - In your Web App's **Configuration** section, add the following environment variables:
     ```plaintext
     PORT=3000
     RABBITMQ_URL=amqp://<username>:<password>@<VM-IP-Address>:5672
     ```

### **Step 3: Configure CI/CD with GitHub Actions**


## **Running the Management Service Locally**

To run the Management Service locally, follow these steps:

### **Prerequisites**
1. **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed on your machine (version 14.x or later).
2. **RabbitMQ**: You need access to a RabbitMQ instance. You can either:
   - Install RabbitMQ locally on your machine by following the instructions on the [RabbitMQ website](https://www.rabbitmq.com/download.html).
   - Use a remote RabbitMQ server (ensure you have the connection details).

### **Step 1: Clone the Repository**
Clone the GitHub repository containing the Management Service code:
```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm i
node index.js

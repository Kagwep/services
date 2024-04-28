

  // Function to create a service
  async function createService(name, description) {
    try {
      // Call the createService function on the contract
      const tx = await contract.createService(name, description);
  
      // Wait for the transaction to be mined
      await tx.wait();
  
      console.log(`Service "${name}" created successfully!`);
    } catch (error) {
      console.error("Error creating service:", error);
    }
  }
  
  // Services to be added
  const services = [
    
    { name: "Airdrops", description: "Receive notifications about upcoming airdrops and claim opportunities. Be the first to know when new tokens are distributed to the community." }
  ];
  
  // Loop through the services and create each one
  services.forEach(async (service) => {
    await createService(service.name, service.description);
  });

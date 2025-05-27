const Lead = require('../models/Lead');
const axios = require('axios');

exports.createLead = async (req, res) => {
  try {
    // Extract lead data from request body
    const leadData = {
      name: req.body.name,
      email: req.body.email,
      company: req.body.company || '',
      message: req.body.message || ''
    };

    // 1. First save to MongoDB
    const lead = new Lead(leadData);
    await lead.save();
    console.log('Lead saved to MongoDB:', lead._id);

    // 2. Then forward to n8n webhook
    const webhookUrl = 'https://yadhagiri.app.n8n.cloud/webhook-test/leads';
    try {
      // Make POST request to n8n webhook
      const webhookResponse = await axios.post(webhookUrl, leadData, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      });
      
      console.log('Successfully forwarded lead to n8n:', {
        leadId: lead._id,
        webhookStatus: webhookResponse.status,
        webhookStatusText: webhookResponse.statusText
      });
    } catch (webhookError) {
      // Log webhook error but don't fail the request
      console.error('Error forwarding to n8n webhook:', {
        error: webhookError.message,
        leadId: lead._id,
        webhookUrl
      });
    }

    // 3. Return success response
    res.status(201).json({
      success: true,
      data: lead,
      message: 'Lead created successfully'
    });
  } catch (error) {
    console.error('Error processing lead:', error);
    res.status(500).json({
      success: false,
      error: 'Error processing lead'
    });
  }
}; 
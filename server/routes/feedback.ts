import { RequestHandler } from "express";
import { FeedbackRequest, FeedbackResponse } from "@shared/api";

export const handleFeedback: RequestHandler = (req, res) => {
  try {
    const feedbackData: FeedbackRequest = req.body;
    
    // Validate the feedback data
    if (!feedbackData.sentiment || !feedbackData.comment) {
      const response: FeedbackResponse = {
        success: false,
        message: "Missing required fields: sentiment and comment are required",
      };
      return res.status(400).json(response);
    }

    if (!['happy', 'unhappy'].includes(feedbackData.sentiment)) {
      const response: FeedbackResponse = {
        success: false,
        message: "Invalid sentiment value. Must be 'happy' or 'unhappy'",
      };
      return res.status(400).json(response);
    }

    // Log the feedback for now (in production, you'd save to database)
    console.log('📝 Feedback received:', {
      sentiment: feedbackData.sentiment,
      comment: feedbackData.comment,
      page: feedbackData.page,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      ip: req.ip || req.connection.remoteAddress,
    });

    // TODO: In production, save to database
    // TODO: Consider sending email notifications for unhappy feedback
    // TODO: Consider integration with feedback management tools

    const response: FeedbackResponse = {
      success: true,
      message: "Feedback received successfully",
    };

    res.json(response);
  } catch (error) {
    console.error('Error processing feedback:', error);
    
    const response: FeedbackResponse = {
      success: false,
      message: "Internal server error",
    };
    
    res.status(500).json(response);
  }
};

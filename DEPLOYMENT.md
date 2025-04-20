# AWS Free Tier Deployment Guide

## Prerequisites
1. AWS Account (Free Tier)
2. Git installed
3. AWS CLI installed

## Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 2: Deploy Frontend (AWS Amplify)
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click "New app" → "Host web app"
3. Choose GitHub as your repository
4. Select your repository and branch
5. Accept the default build settings (Amplify will auto-detect React)
6. Click "Save and deploy"

## Step 3: Set up Database (DynamoDB)
1. Go to [DynamoDB Console](https://console.aws.amazon.com/dynamodb)
2. Click "Create table"
3. Table name: `MovieTickets`
4. Partition key: `id` (String)
5. Sort key: `timestamp` (String)
6. Click "Create table"

## Step 4: Create API (Lambda + API Gateway)
1. Go to [Lambda Console](https://console.aws.amazon.com/lambda)
2. Click "Create function"
3. Choose "Author from scratch"
4. Function name: `movie-ticket-api`
5. Runtime: Node.js 18.x
6. Click "Create function"
7. Add your API code
8. Go to API Gateway and create a new REST API
9. Connect it to your Lambda function

## Environment Variables
Add these to your Amplify environment:
```
REACT_APP_API_URL=<your-api-gateway-url>
REACT_APP_REGION=<your-aws-region>
```

## Free Tier Limits
- Amplify: 5GB storage, 15GB data transfer/month
- DynamoDB: 25GB storage, 25WCU/25RCU/month
- Lambda: 1M requests/month, 400,000 GB-seconds compute time
- API Gateway: 1M API calls/month

## Monitoring Your Usage
1. Go to AWS Billing Dashboard
2. Set up billing alerts
3. Monitor your usage regularly to stay within free tier limits

## Important Notes
- Free tier is valid for 12 months
- Set up billing alerts to avoid unexpected charges
- Keep your AWS credentials secure
- Regularly backup your data 
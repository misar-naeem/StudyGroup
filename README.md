## Getting Started

### 1. Install Git and Node.js
Before you can run the project, you need to install Git and Node.js. You can download them from the following links:
- Install Git following GitHub's guide at https://github.com/git-guides/install-git  
- Install the latest LTS Version of Node.js at https://nodejs.org/en/download/
### 2. Clone the repository
Once you have installed both Git and Node.js: 
- Open where you want to store the repository
- Open PowerShell in that folder (Shift + Right Click -> Open PowerShell window here)
- Clone the repository by running the following command:
```
git clone https://github.com/misar-naeem/StudyGroup.git
```
### 3. Install dependencies
Now that you have cloned the repository, you need to install the dependencies. To do so, open the `StudyGroup` folder in PowerShell (Shift + Right Click -> Open PowerShell window here) and run the following command:
```
npm ci
```
### 4. Retrieve secrets
To login, you need to retrieve the secrets from the project owner. Once you have the secrets file, place it in the root of the project (the `StudyGroup` folder) and rename it to `.env.local`.
### 5. Run the project
After everything has been installed, you can run the project by running the following command:
```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/).

## Deployment

The `main` branch of `misar-naeem/StudyGroup` is set up to automatically deploy to [sds.dinh.cc](https://sds.dinh.cc) (AWS) and [studygroup.dinh.cc](https://studygroup.dinh.cc) (Vercel). 
Please allow up to 5 minutes for these deployments to update.

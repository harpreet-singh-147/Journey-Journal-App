# Welcome to Journey Journal

## This app was created by our team "Work from Ho Ho Home"

<br>

> ### You can see a working version [here](https://northcoders.com/projects/nov-2022/journey-journal).

<br>

### What is a journey journal?

Journey Journal functions as a tool for tourists, holiday goers, or any other kind of user who is in need of a fast, intuitive way to document their memories and experiences, all within an easy to use mobile application.. Journey Journal also includes features that we hope can improve your trips by recommending places to visit. We were inspired to make this app as it was something that was missing from all our phone libraries but we would all use going forward and took the opportunity to develop our app to our preferences.
Users will make Journey cards which are specific to their own details. Start by adding a trip and giving it a Name, City & start to end date. In this trip card will be details of specific
places you visited on the trip split up into three categories; Accommodation, Catering, Attractions. These will also hold cards of their own which you can break down even further like Name, City, Address, Description, Rating and date. This will allow users to remember all aspects of a trip, the good the bad and the ugly for personal keepsakes. Journey Journal also incorporates a suggestions tab which will give the user places to visit based on their location in hopes to improve their experiences.

In order to access this repo locally, you can either fork and clone this repo, or clone directly from the following url:

```
git clone https://github.com/harpreet-singh-147/Journey-Journal-App.git
```

Firstly, please run npm install to install dependencies.

In order to run this repo on your local machine you will need to download and install the [Android Studio Emulator](https://developer.android.com/studio) or the [XCode Iphone Emulator](https://developer.apple.com/xcode/) (if using macOS).

You will also need to create a [Google](https://www.google.com/account/about/) account then get started with [Firebase](https://cloud.google.com/firestore/docs/client/get-firebase), register a new API Key at [Ticketmaster](https://developer-acct.ticketmaster.com/user/register) and [geoapify.com](https://www.geoapify.com/), then add your own config files to a newly created .env file. The .env file should look like below:

```
FIREBASE_API_KEY=*Your Firebase config details here*
FIREBASE_AUTH_DOMAIN=*Your Firebase config details here*
FIREBASE_PROJECT_ID=*Your Firebase config details here*
FIREBASE_STORAGE_BUCKETt=*Your Firebase config details here*
FIREBASE_MESSAGING_SENDER_ID=*Your Firebase config details here*
FIREBASE_APP_ID=1:*Your Firebase config details here*
TICKETMASTER_API=*Your ticketmaster API key here*
GEOPIFY_API_KEY=*Your geopify API key here*
```

# IP Camera motion handler

When recording an event captured by the IP camera, a video file is saved.
This script can be used with [motion program](https://motion-project.github.io/) to upload a video file to google drive and send an email notification.

For the script to work, you need to add the following environment variables (keep in mind they should be available for service):
```
export EMAIL_TO='...'
export EMAIL_USERNAME='...'
export EMAIL_PASSWORD='...'
export EMAIL_HOST='smtp.gmail.com'
export EMAIL_PORT=465
export EMAIL_SECURE=true
export FALLBACK_EMAIL_USERNAME='...'
export FALLBACK_EMAIL_PASSWORD='...'
export FALLBACK_EMAIL_HOST='smtp.gmail.com'
export FALLBACK_EMAIL_PORT=465
export FALLBACK_EMAIL_SECURE=true
export GOOGLE_DRIVE_CREDENTIALS_PATH='/Users/Demo/credentials.json'
export GOOGLE_DRIVE_PARENT_ID='...'
```
You can follow this [stackoverflow question](https://stackoverflow.com/questions/60939637/how-to-set-the-environment-variables-to-be-used-by-the-service-running-on-linux) to find a way how to setup env variables for linux service.
How to create a Google Drive credentials is well explained [in this video guide on youtube](https://youtu.be/Z2MCxblgPoc). 

`GOOGLE_DRIVE_PARENT_ID` is an Id of the directory that is shared with google drive account.

The fallback parameters are optional, they would be used only when main email connection don't work. 


For the script to work correctly, you also need to set the following settings in the file `/etc/motion/motion.conf`:
```
# Create movies of motion events.
movie_output on

# Container/Codec to used for the movie. See motion_guide.html
movie_codec mp4

# Command to be executed when a movie file is closed. Make sure you use correct path instead of '<git_path>'.
on_movie_end <git_path>/run.sh %f

# Target directory for pictures, snapshots and movies
target_dir /tmp/motion
```

Make sure all the executable and configuration files have correct linux acl permissions for `motion:motion`.

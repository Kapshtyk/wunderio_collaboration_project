# Collaboration project with Wunder

<img width="1509" alt="Screenshot 2024-05-14 at 00 55 24" src="https://github.com/Kapshtyk/wunderio_collaboration_project/assets/114028017/255cf508-ac1f-40b4-b715-4eaf9d88c4dc">

This project is a final group work within the Full Stack Developer program at Business College Helsinki and it was done in collaboration with [Wunder](https://wunder.io). The main goal of this project was rebuilding a website using headless Drupal with Next.js on the frontend based on [next-drupal-starterkit](https://github.com/wunderio/next-drupal-starterkit), an innovation by Mario Vercellotti from Wunder. 

## Project description

In this project we provided the functionality to create different types of content (e.g. articles, site specific sections such as services, events, careers, including nested pages such as open positions). The main backend module was paragraphs, which allows flexible customisation of the internal content of the site pages, and also has great integration with jsonapi, allowing this module to be used in a headless solution. In addition, the tmgmt module is used on the backend along with an additional module that provides the ability to automatically translate content using DeepL. A small custom module is also implemented on the backend to store information in the Drupal database about the consent received to process cookies, highlighting the type of cookie and the expiry date of the consent.

The frontend was mainly implemented using Next.js and styled using Tailwind, but the Zod library played a large role in the implementation of the application, providing validation of all data received from the backend. In addition to a unique page design for each specific section of the site, the frontend implemented support for three languages, a custom component for working with cookies, and connected Matomo analytics (with information output in the Drupal admin panel). 

## How to run the project
Local development is handled by [Lando](https://lando.dev). Both frontend and backend are covered by the Lando setup, so that is the only real requirement. 

<details> 
<summary>⚠️ NOTE: Use npm inside Lando!</summary>

Instead of running npm operations in your host machine, template requires you to use npm inside Lando: this ensures the same node version is used by all developers participating in the project, and also that the node process has the right environment variables to connect to the backend (these are defined in the .lando.yml file in the root of the project).

Just prefix all npm operations with lando.

So instead of `npm install`, run `lando npm install`, instead of `npm run dev` run `lando npm run dev`, etc.

Stopping a running npm operation running inside the Lando node container

If you have closed the terminal window where you were running the server with lando npm start or lando npm run dev, and you want to stop the running npm operation, you can use the specially created lando npm-stop command that will log into the node container and kill all node processes there.

More information can be found in the [next-drupal-starterkit](https://github.com/wunderio/next-drupal-starterkit) repository.
</details>

Getting started

All you need to do is run the setup script like this:
```
./setup.sh
```

The script will execute a series of commands in sequence. If an error occurs, you can run the script again, and it will pick up where it left off. It will also import the database with the content and all the configuration.

If the script has failed on some step, and instead of continuing you want to start from scratch, you can run the script with the -c flag:
```
./setup.sh -c
```

When the script has finished, you will see a notification in the terminal:
```
https://next-drupal-starterkit.lndo.site/en/user/reset/1/1715635799/Wz-n-PD-O2B4qXlEzvyaWvg756r_aCtLlKqiQ9ojtZc/login
🏎️ Starting the frontend site in production mode...
⚠️ Note: the site will be available at https://frontend.lndo.site/ in addition to the usual localhost:3000
```

You can use the links to access the frontend and backend. The alternative is to use the `lando drush uli` command to access the backend. Another way is to open docker, find the `nextdrupalstarterkit_appserver_nginx` container, open port 80 and enter the following credentials: login: admin, password: xZebbTDqEh. 

The frontend works as a normal Next.js application, so you can just prefix the npm run dev command with lando when you have stopped the application: `lando npm run dev`.

## Tech stack
### Backend
- Drupal 10, including the following modules: paragraphs, jsonapi, webform, tmgmt.

### Frontend 
- Next.js (13.5)
- Zod
- Tailwind
- Next-auth
- Next-i18next

## Contributors

- Nailya Philippova [@nailaphilip](https://github.com/nailaphilip)
- Shree Ram Bhusal [shree0007](https://github.com/shree0007)
- Sahil Thapa [@sahilt2](https://github.com/sahilt2)
- Oliver Janhunen [@OliverOsmoSamuel](https://github.com/OliverOsmoSamuel)
- Arseniiy Kapshtyk [@Kapshtyk](https://github.com/Kapshtyk)



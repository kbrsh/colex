# Colex

## Overview

Track: Tools

Team:

We are a team of two high school juniors from California attending Dublin High School, and we are both part of our school’s engineering academy. We’ve always had a passion for computer science and have some experience with web development. However, the field of artificial intelligence is largely new territory for us. This project is our way of exploring the field and learning how machine learning models work while also applying some of the skills that we already know.

## Goals of the project

We found that it’s often useful to make certain texts easier to read for people who want a quicker summary or younger students, as well as making texts more complex to expand one’s vocabulary. However the problem is that current methods for doing so lack flexibility and creativity in altering texts.

So the solution we came up with to fix that problem is a tool that utilizes AI to convert any text to a simplified, easier to read version, as well as a harder, more thorough text to fit the needs of any audience.

The goal of our project is to create a tool that can generate two versions of any given text: an “easy” version and a “hard” version:

* The easy version will be more concise, easier to read, and more approachable — useful for younger students learning reading comprehension, writers working on their concision, or casual consumers of news articles and prose looking for a digestible summary.
* The hard version will be more complex, incorporate a wider range of vocabulary, use varied sentence structures, and include extra details.

## Desired user experience

The core idea behind our project is for users to have a quick and easy experience converting their texts. The whole purpose of simplifying the text is to reduce the effort from the user to read the article. That’s why our UI is made to be simple and straightforward so that people don’t have to spend time figuring it out and can jump straight into their reading.

Specifically, our UI was inspired by the tried and true classic design of a newspaper. We aimed for a minimal and intuitive experience that allows for pleasant reading and an easy way of transforming texts. This UI interacts with a backend server which handles API requests and runs the user text through a machine learning model designed to output text in an easy and hard version. After receiving this data, it will dynamically update the state and display the versions to the user.

## Implementation details

Our project has three main parts: the frontend web application, the backend server API, and the machine learning model.

The frontend is a web application that we created using HTML, CSS, JavaScript, and React and is located in the `client` folder in our source code. We used React to allow for creating a dynamic user interface and elegantly represent state changes within our code. The rest of the code and newspaper UI (edition number, date, etc) is implemented in vanilla JavaScript that we worked on improving our skills in along the way. The CSS was super fun to create and uses flexbox and various positioning techniques that come together to create the newspaper aesthetic that we were aiming for.

The backend is an HTTP server implemented in Python and powered by the Flask library. It is a simple API that handles requests containing the content that is to be transformed. With this text, it crafts a prompt for our machine learning model and returns its responses for both the easy and hard version in JSON format.

The machine learning model is based on the 355M parameter GPT-2 text model released by OpenAI. Using a library for GPT-2 along with TensorFlow, we worked to fine-tune our model to be able to generate texts at different levels because GPT-2 by itself is a general text model rather than a specialized one. We manually scoured the web for training data and created a corpus to train on by ourselves. The format it used was like this:

```
Normal Article:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Easy Article:
Lorem ipsum dolor sit amet.
<|endoftext|>
```

Or this:

```
Normal Article:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Hard Article:
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
<|endoftext|>
```

With these, the model was able to learn a general format that could then be extended to other texts and use cases. GPT works by predicting and generating the next word in a given text. For our use case, our API crafted prompts to our model that looked like this:

```
Normal Article:
This is an example sentence from an article that the model hasn’t seen before!

Easy Article:
```

With its knowledge based off of the training data, the model would generate text that is considered “easier” than the preceding normal text. Our API then truncates this output until it finds the `<|endoftext|>` token.

By using this model, we were able to create a model capable of generating two versions of a given text that were genuinely novel. It often rewrites sentences and can even change the meaning of a text because GPT has been trained on knowledge of English based off of billions of texts from the internet. With this knowledge, it is capable of adding new details or using creative ways to generate different versions of text.

## Issues encountered, bugs, and future work

Some issues we encountered were that the AI sometimes didn’t work as intended due to the time restrictions which meant we didn’t teach it using enough data for it to do exactly what we wanted it to do. It was also difficult to find and get together the data we needed for teaching since Lexile is not a popular topic and there aren’t many sources which could provide us with the easy-normal-hard text templates we needed. Another issue we ran into was dealing with CORS requests with our API, which is something that many developers somehow run into every time they create one. Finally, the GPT-2 model we used was taking up a lot of space and took significant amounts of time to run, which was an issue since we had to work under time constraints. Due to this, we also weren’t able to deploy the model on any servers because we didn’t have the budget to buy hosting that came with GPUs or enough RAM to generate texts.

The main bug or unintended feature we currently have is that the harder versions of the text often contain false information. To enhance the text, the AI uses not only the original, but also other sources from all over the internet. This means that sometimes it adds in details that are not supported by the original text and are often not true which is a problem for people looking for accurate news or information. However, our project is still useful for entertainment or fiction pieces where added details can make a text more appealing and interesting to read.

Future work that has to be done to make the tool better is to train the model on more data to perfect the way it generates the texts. We would also like to fix the issue of the AI giving out false information by filtering it out or limiting the scope of it’s reach so it doesn’t add too many things outside the text. We could also add more difficulty levels than just easy and hard to make the adaptations more flexible and thus appeal to a larger audience. Another feature that might be cool to have is to track how difficult the original text was by tracking how many changes were made to turn it into the easier and harder versions. So if there were barely any changes made to make it harder and a lot to make it easier, it can be inferred that the original text was already challenging.

## Configuration

To start the server:

```sh
$ cd server
$ python server.py
```

Note: You’ll need the trained model checkpoint saved. We haven’t uploaded it here because it is too large (~1.5GB).

To start the client dev server:

```sh
$ cd client
$ npm run dev
```

To see how we trained our model, check out the notebook file located within the `model` folder. When rendered, it looks like this:

![Notebook](https://github.com/kbrsh/colex/raw/master/images/notebook-1.png)
![Notebook](https://github.com/kbrsh/colex/raw/master/images/notebook-2.png)
![Notebook](https://github.com/kbrsh/colex/raw/master/images/notebook-3.png)


## Examples

![Demo 1](https://github.com/kbrsh/colex/raw/master/images/demo-1.jpg)
![Demo 2](https://github.com/kbrsh/colex/raw/master/images/demo-2.jpg)
![Demo 3](https://github.com/kbrsh/colex/raw/master/images/demo-3.jpg)

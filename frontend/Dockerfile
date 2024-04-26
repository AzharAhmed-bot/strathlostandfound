# Use a single stage build to handle both frontend and backend
FROM python:3.10-slim-buster AS base

# Set the working directory
WORKDIR /lostandfound

# Copy project files into the Docker image
COPY . /lostandfound

# Install pipenv
RUN pip install pipenv

# Explicitly set Python version for pipenv
RUN pipenv --python 3.10

# Install curl, npm, and other dependencies
RUN apt-get update && apt-get install -y npm curl

# Install nvm and node
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash \
    && export NVM_DIR="$HOME/.nvm" \
    && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
    && nvm install 21 \
    && nvm use 21

# Install backend dependencies
RUN pipenv install

# Frontend setup
# Install npm packages
RUN npm install

# Expose ports
EXPOSE 5173

# Set up the command to run the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

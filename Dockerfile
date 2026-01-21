FROM node:20-alpine

WORKDIR /app

# Install Claude Code (if available via npm)
RUN npm install -g @anthropic-ai/claude-code

# Set up development environment
RUN apk add --no-cache git

# Keep container running
CMD ["tail", "-f", "/dev/null"]
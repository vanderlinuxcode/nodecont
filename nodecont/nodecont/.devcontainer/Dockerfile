FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Permite o uso de pacotes globais sem sudo
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN corepack enable

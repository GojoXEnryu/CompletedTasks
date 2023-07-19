FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build

WORKDIR /app

COPY *.sln .

COPY CartProject.Application/*.csproj ./CartProject.Application/
COPY CartProject.Domain/*.csproj ./CartProject.Domain/
COPY CartProject.Infrastructure/*.csproj ./CartProject.Infrastructure/

RUN dotnet restore -r alpine-x64

COPY CartProject.Application/. ./CartProject.Application/
COPY CartProject.Domain/. ./CartProject.Domain/
COPY CartProject.Infrastructure/. ./CartProject.Infrastructure/

RUN dotnet build

RUN dotnet publish -c Release -o /out -r alpine-x64

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine AS publish

WORKDIR /app
COPY --from=build /out .

EXPOSE 80
ENTRYPOINT ["./CartProject.Application"]
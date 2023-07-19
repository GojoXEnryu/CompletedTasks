FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build

WORKDIR /app

COPY *.sln .

COPY UserProject.Application/*.csproj ./UserProject.Application/
COPY UserProject.Domain/*.csproj ./UserProject.Domain/
COPY UserProject.Infrastructure/*.csproj ./UserProject.Infrastructure/

RUN dotnet restore -r alpine-x64

COPY UserProject.Application/. ./UserProject.Application/
COPY UserProject.Domain/. ./UserProject.Domain/
COPY UserProject.Infrastructure/. ./UserProject.Infrastructure/

RUN dotnet build

RUN dotnet publish -c Release -o /out -r alpine-x64

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine AS publish

WORKDIR /app
COPY --from=build /out .

EXPOSE 80
ENTRYPOINT ["./UserProject.Application"]
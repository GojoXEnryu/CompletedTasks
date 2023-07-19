FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build

WORKDIR /app

COPY *.sln .

COPY ProductProject.Application/*.csproj ./ProductProject.Application/
COPY ProductProject.Domain/*.csproj ./ProductProject.Domain/
COPY ProductProject.Infrastructure/*.csproj ./ProductProject.Infrastructure/

RUN dotnet restore -r alpine-x64

COPY ProductProject.Application/. ./ProductProject.Application/
COPY ProductProject.Domain/. ./ProductProject.Domain/
COPY ProductProject.Infrastructure/. ./ProductProject.Infrastructure/

RUN dotnet build

RUN dotnet publish -c Release -o /out -r alpine-x64

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine AS publish

WORKDIR /app
COPY --from=build /out .

EXPOSE 80
ENTRYPOINT ["./ProductProject.Application"]
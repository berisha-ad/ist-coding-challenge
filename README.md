# VAT Number Validation Service

## Introduction

This **Node.js** application pre-validates VAT numbers using **regex** and then forwards them to the appropriate external web service to check if they exist.  
The service is built with:

- **Node.js 22.13**
- **TypeScript**
- **pnpm** (package manager)
- **Express** for handling REST requests
- **Zod** for request schema validation
- **Helmet** for secure HTTP headers

Automated tests are implemented with **Jest** and **supertest** to ensure functionality.

---

## Purpose

The service exposes a single endpoint:

`POST /validate`

It accepts a **countryCode** and a **VAT number** in the request body.  
Based on the `countryCode`, the service decides whether to use the **EU VAT validation service** or the **Swiss VAT validation service**.  
Before sending the request to the external service, it strictly validates the VAT number format.

---

## Features

- **Strict format validation** using regex
- **Security headers** via Helmet
- **Automatic routing** to the correct external validation service based on `countryCode`

---

## Usage

### Prerequisites

- **Node.js** `22.13`
- **pnpm** (latest version recommended)

### Project Setup

```bash
pnpm install        # Install dependencies
pnpm run dev        # Start development server
pnpm watch:test     # Run automated tests in watch mode
```

## 📖 API Documentation

### Endpoint

`POST /validate`

#### Request Body

```json
{
  "countryCode": "AT",
  "vat": "ATU12345678"
}
```

### Responses

1. VAT number is valid

- Status: 200
- { "valid": true, "details": "VAT number is valid for the given country code."}

2. Regex validation failed

- Status: 400
- { "error": "This VAT format is invalid" }

3. External service reports invalid VAT

- Status: 400
- { "valid": false, "details": "VAT number is invalid."}

4. Unsupported countryCode

- Status: 501
- { "error": "Not implemented" }

## Configuration

The service reads configuration from **`config.json`** in the root directory:

```json
{
  "port": 3000,
  "expressServerOptions": {
    "keepAliveTimeout": 65000,
    "headersTimeout": 66000,
    "requestTimeout": 0,
    "timeout": 0,
    "maxHeadersCount": 0,
    "maxConnections": 0
  }
}
```

## Dependencies

- **express** – REST framework
- **zod** – Request schema validation
- **helmet** – Security headers
- **response-time** – Adds `X-Response-Time` header

---

## Contributing

If you want to contribute:

1. Create **issues** and **feature requests**
2. Create **pull requests** with a detailed description
3. Implement **unit tests** and **API tests**

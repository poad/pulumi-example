# AGENTS.md - Coding Guidelines for AI Agents

This guide provides essential information for AI agents operating in this repository.

## Project Structure

This is a monorepo with pnpm workspaces containing:

- **s3-bucket**: AWS CDK TypeScript project
- **pulumi-start-aws**: Pulumi TypeScript project

## Build, Lint, and Test Commands

### Root Level Commands

```bash
# Install dependencies (pnpm)
pnpm install

# Run all lint checks across workspace
pnpm -r --if-present lint

# Run all builds across workspace
pnpm -r --if-present build

# Run all tests across workspace
pnpm -r --if-present test

# Run markdownlint
pnpm dlx markdownlint-cli2 **/*.md

# Run markdownlint with auto fix
pnpm dlx markdownlint-cli2 **/*.md --fix

```

### s3-bucket (CDK Project)

```bash
# Build TypeScript
pnpm -C s3-bucket build

# Watch mode for development
pnpm -C s3-bucket watch

# Run tests (vitest)
pnpm -C s3-bucket test

# Run a single test file
pnpm -C s3-bucket test -- test/s3-bucket.test.ts

# Run tests matching a pattern
pnpm -C s3-bucket test -- --grep "pattern"

# Lint ESLint configuration
pnpm -C s3-bucket lint

# View compiled output
pnpm -C s3-bucket cdk synth
```

### pulumi-start-aws (Pulumi Project)

```bash
# Lint and format check
pnpm -C pulumi-start-aws lint

# Fix formatting and linting issues
pnpm -C pulumi-start-aws lint-fix

# Format code with oxfmt
pnpm -C pulumi-start-aws fmt

# Check format without modifying
pnpm -C pulumi-start-aws fmt:check

# Lint with oxlint
pnpm -C pulumi-start-aws oxlint

# Fix with oxlint
pnpm -C pulumi-start-aws oxlint:fix
```

## Code Style Guidelines

### TypeScript Configuration

**Compiler Settings** (strict mode enabled):

- Target: ES2022 (s3-bucket), ES2020 (pulumi-start-aws)
- Module: NodeNext
- Strict type checking enabled: `noImplicitAny`, `strictNullChecks`, `noImplicitThis`, `alwaysStrict`
- All implicit returns must be explicit: `noImplicitReturns: true`
- Source maps enabled for debugging

### Imports & Module System

- Use ES6 module syntax: `import`/`export` (type: "module" in package.json)
- Import ordering: external libraries, then internal modules
- Use ESLint import rules for validation
- Avoid default exports; use named exports
- Resolver configured for both TypeScript and Node modules

### Formatting Rules

**EditorConfig Standards** (.editorconfig):

- Indentation: 2 spaces
- Line endings: LF
- Charset: UTF-8
- Trim trailing whitespace
- Insert final newline

**Markdown Rules**:

- Use `pnpm dlx markdownlint-cli2 <file>`
  - with autofix `pnpm dlx markdownlint-cli2 <file> --fix`

**ESLint Rules** (s3-bucket):

- Semicolons: required (`@stylistic/semi: 'always'`)
- Quotes: single quotes (`@stylistic/quotes: 'single'`)
- Indentation: 2 spaces (`@stylistic/indent: 2`)
- Trailing commas: always multiline (`@stylistic/comma-dangle: 'always-multiline'`)
- Arrow function parentheses: always required (`@stylistic/arrow-parens: 'always'`)

**Linting** (pulumi-start-aws):

- Uses oxlint (fast Rust linter) for primary linting
- Uses oxfmt for formatting (faster than prettier)
- Configuration in `.oxlintrc.json` with TypeScript, Unicorn, and OXC plugins
- Comprehensive rule set for correctness and best practices

### Naming Conventions

- **Classes**: PascalCase (e.g., `S3BucketStack`)
- **Functions/Variables**: camelCase (e.g., `bucketName`, `createBucket()`)
- **Constants**: camelCase or SCREAMING_SNAKE_CASE for true constants
- **Files**: kebab-case for configuration (e.g., `eslint.config.ts`), match export names for source

### Types & Type Safety

- **No `any` type**: Use explicit types or generics
- **No `unknown` without narrowing**: Always narrow unknown types before use
- **Classes**: Avoid unless extending Error class or requiring `instanceof` checks
- **Strict null checking**: Handle null/undefined explicitly
- **Strict property initialization**: Initialize all class properties

**Type Declaration Files**:

- Declaration files generated: `declaration: true` in tsconfig.json
- Type definitions in `typeRoots: ["./node_modules/@types"]`

### Error Handling

- Wrap async operations in try-catch blocks
- Use typed error responses when possible
- Log errors with context before re-throwing
- Return error types or throw descriptive custom errors
- In CDK/Pulumi code, use framework-provided error handling

### Comments & Documentation

- Add JSDoc comments for exported functions and classes
- Explain the "why" not the "what" in complex logic
- Use inline comments sparingly for non-obvious code
- Keep comments up-to-date with code changes

### Framework-Specific Guidelines

**AWS CDK** (s3-bucket):

- Extend `cdk.Stack` for stack definitions
- Use `Construct` for reusable components
- Configure resources via constructor props
- Use `RemovalPolicy` for cleanup strategies

**Pulumi** (pulumi-start-aws):

- Export stack outputs for reference
- Use oxlint-disable comments for intentional unused imports
- Follow Pulumi state management patterns

## Disabled Checks (Intentional)

- oxlint: `no-unused-vars` disabled for import statements (use `oxlint-disable-next-line` when needed)
- TypeScript: `noUnusedLocals: false`, `noUnusedParameters: false` (handled by linters)
- ESLint ignores: `cdk.out`, `dist`, `.d.ts` files

## Running Tests

**Vitest Configuration**:

- Framework: vitest 4.x
- Test files: `*.test.ts` or `*.spec.ts`
- Run all tests: `pnpm -C s3-bucket test`
- Run single file: `pnpm -C s3-bucket test -- test/file.test.ts`
- Run with grep: `pnpm -C s3-bucket test -- --grep "pattern"`

## CI/CD Pipeline

- Runs on: `main` branch pushes and pull requests
- Steps: Install dependencies → Lint → Build
- Node version: LTS (latest)
- Package manager: pnpm with no frozen lockfile

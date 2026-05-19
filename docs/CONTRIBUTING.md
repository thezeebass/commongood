# Contributing to Common Good

## Code of Conduct

We are committed to providing a welcoming and inspiring community. Please read our code of conduct.

## Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Development Setup

See [GETTING_STARTED.md](./GETTING_STARTED.md)

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests liberally after the first line

## Testing

```bash
# Run all tests
bash scripts/run-tests.sh

# Run specific test suite
cd backend && npm test
cd ai-agent && pytest
```

## Pull Request Process

1. Update README.md with any new features
2. Update ARCHITECTURE.md if system design changes
3. Ensure tests pass
4. Request review from maintainers

## Reporting Bugs

Use the issue tracker with:
- **Title**: Clear and descriptive
- **Description**: Steps to reproduce
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happened

## Feature Requests

Include:
- **Use case**: Why this feature is needed
- **Proposed solution**: Your implementation idea
- **Alternatives**: Other approaches considered

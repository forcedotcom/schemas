<!-- 1cd51ced-f36b-4403-8452-1d3be6f10fd4 5545e5b4-26b2-4d94-89e6-077587b949f5 -->
# Migrate @salesforce/schemas to Zod

## Overview

Convert the library to use Zod schemas as the source of truth, generating TypeScript types and JSON schemas from them. Support runtime validation via exported Zod schemas.

## Key Files to Modify

- `src/sfdx-project/*.ts` - Convert all TS types to Zod schemas
- `src/project-scratch-def/*.ts` - Create new Zod schemas for scratch def (currently only JSON)
- `src/index.ts` - Export Zod schemas and maintain backwards compatibility
- `scripts/build.js` - Replace ts-json-schema-generator with zod-to-json-schema
- `package.json` - Add zod and zod-to-json-schema dependencies

## Dependencies

Install:

- `zod` - Core schema validation library
- `zod-to-json-schema` - Convert Zod schemas to JSON Schema

Update dependencies:

- `prettier` (1.18.2 → latest)
- `typescript` (5.4.5 → latest)

Remove volta from `package.json` (outdated node 12.4.0 pin)

## Implementation Approach

### 1. sfdx-project Migration

Convert existing TypeScript types to Zod schemas:

- `replacements.ts` - Complex discriminated unions
- `registryPresets.ts` - Simple string array
- `registryVariants.ts` - Nested recursive types
- `packageDir.ts` - Union types with shared base
- `bundleEntry.ts` - Simple object
- `sfdxProjectJson.ts` - Main schema composing all others

Pattern: `z.object()`, `z.union()`, `z.discriminatedUnion()`, `z.lazy()` for recursion

### 2. project-scratch-def Migration

Create new Zod schemas converting the 1098-line JSON schema:

- Core properties (orgName, edition, country, etc.)
- Features array with ~200 pattern-based string unions
- Settings object with ~100 metadata type properties
- All descriptions and titles preserved via `.describe()`

Split into composable files:

- `src/project-scratch-def/features.ts`
- `src/project-scratch-def/settings.ts`
- `src/project-scratch-def/scratchOrgDef.ts`

### 3. Type Exports

Use `z.infer<typeof schema>` to derive TypeScript types:

```typescript
const ProjectJsonSchema = z.object({...});
type ProjectJson = z.infer<typeof ProjectJsonSchema>;
```

Export both schemas and types from `src/index.ts`:

```typescript
export { ProjectJsonSchema, type ProjectJson };
```

### 4. Build Process

Replace ts-json-schema-generator with zod-to-json-schema in `scripts/build.js`:

- Import Zod schemas
- Call `zodToJsonSchema()` for each
- Write to `compiled/*.schema.json`
- Copy to root and `lib/`

### 5. Backwards Compatibility

Maintain existing exports:

- File paths to `.schema.json` files (unchanged)
- TypeScript types (now derived from Zod)
- Add new raw Zod schema exports for runtime validation

## Testing

Existing tests in `tests/validate-examples.test.js` validate JSON schemas against examples - these should continue to pass with generated schemas.

## Benefits

- Runtime validation via Zod schemas
- Single source of truth reduces drift
- Better composition and reusability
- Type safety for validation logic
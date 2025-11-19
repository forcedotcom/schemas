import { z } from "zod";
import { simpleFeaturesList } from "./simpleFeaturesList";
import { patternFeaturesList } from "./patternFeaturesList";

// Helper to create a feature pattern with title
const featurePattern = (name: string) =>
  z
    .string()
    .regex(new RegExp(`^${name}:[0-9]+$`))
    .meta({ title: `${name}:<value>` });

// Combined features schema
export const FeaturesSchema = z.array(
  z.union([
    // Feature patterns - parametrized features with numeric values
    z.union(patternFeaturesList.map(featurePattern)),
    // Feature enum - boolean/named features

    z.enum(simpleFeaturesList),
  ]),
);

export type Features = z.infer<typeof FeaturesSchema>;

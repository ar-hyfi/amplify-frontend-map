/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  getOverridesFromVariants,
  mergeVariantsAndOverrides,
} from "@aws-amplify/ui-react/internal";
import { Flex, Text } from "@aws-amplify/ui-react";
export default function MapChipPrimitive(props) {
  const { value = "1002", overrides: overridesProp, ...rest } = props;
  const variants = [
    {
      overrides: { Value: {}, MapChipPrimitive: {} },
      variantValues: { state: "Default" },
    },
    {
      overrides: {
        Value: { color: "rgba(255,255,255,1)" },
        MapChipPrimitive: { backgroundColor: "rgba(34,34,34,1)" },
      },
      variantValues: { state: "Pressed" },
    },
    {
      overrides: {
        Value: {},
        MapChipPrimitive: { backgroundColor: "rgba(235,235,235,1)" },
      },
      variantValues: { state: "Hover" },
    },
  ];
  const overrides = mergeVariantsAndOverrides(
    getOverridesFromVariants(variants, props),
    overridesProp || {}
  );
  return (
    <Flex
      gap="10px"
      direction="row"
      width="32px"
      height="28px"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      position="relative"
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.1899999976158142)"
      borderRadius="43px"
      padding="6px 8px 6px 8px"
      backgroundColor="rgba(255,255,255,1)"
      display="flex"
      {...getOverrideProps(overrides, "MapChipPrimitive")}
      {...rest}
    >
      <Text
        fontFamily="Roboto"
        fontSize="14px"
        fontWeight="500"
        color="rgba(34,34,34,1)"
        lineHeight="16.40625px"
        textAlign="left"
        display="block"
        direction="column"
        justifyContent="unset"
        width="unset"
        height="unset"
        gap="unset"
        alignItems="unset"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        whiteSpace="pre-wrap"
        children={value}
        {...getOverrideProps(overrides, "Value")}
      ></Text>
    </Flex>
  );
}

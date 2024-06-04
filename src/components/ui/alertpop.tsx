"use client";
import React from "react";
import { Alert } from "flowbite-react";
import { useState } from "react";
const Alertpop = (props: { error: string; colors: string }) => {
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {!dismissed && (
        <Alert
          rounded
          color={props.colors}
          onDismiss={() => setDismissed(true)}
        >
          <span className="font-medium">Error!</span> {props.error}.
        </Alert>
      )}
    </>
  );
};
export default Alertpop;

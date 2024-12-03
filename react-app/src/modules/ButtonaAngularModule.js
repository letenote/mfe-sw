import React, { useEffect, useRef } from "react";
import { mount } from "ionicAngularApp/loadApp";

const ButtonaAngularModule = () => {
  const ref = useRef(null);
  useEffect(() => {
    mount();
  }, []);
  return (
    <div className="button-angular-module">
      <app-root></app-root>
    </div>
  );
};

export default ButtonaAngularModule;

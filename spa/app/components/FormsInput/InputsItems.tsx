import * as React from "react";

export const Inputs = (data: any) => {
  return (
    <>
      {Object.keys(data.data).map(item => {
        let value: any;
        // @ts-ignore
        value = data.data[item];
        return (
          <p key={item}>
            <label htmlFor={item}>{item}</label>
            <input
              className="form-control"
              type="text"
              id={item}
              value={value}
              onChange={data.handleInputChange}
            />
          </p>
        );
      })}
    </>
  );
};

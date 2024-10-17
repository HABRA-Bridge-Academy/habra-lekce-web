import React from "react";

const deploytime = process.env.PAYLOAD_PUBLIC_DEPLOY_TIME;
const gitref = process.env.PAYLOAD_PUBLIC_VERSION;
const local = process.env.PAYLOAD_PUBLIC_LOCAL;


const VersionInfo: React.FC = () => {

  let content;
  if (local === "true") {
    content = <div>local LIVE server</div>;
  } else {
    content = (
      <div>
        <div>deployed on: {deploytime} </div>
        <div>git ref: {gitref}</div>
      </div>
    );
  }

  return (
    <div style={{ order: 10 }}>
      {content}
    </div>
  );
};

export default VersionInfo;

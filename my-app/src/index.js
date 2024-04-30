// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



import React from "react";
import { render } from "react-dom";
import {QRCodeSVG} from 'qrcode.react';
// import { QRCode } from "react-qr-svg";

const styles = {
  root: {
    color: "#2C1752",
    fontFamily: "sans-serif",
    textAlign: "center"
  },
  title: {
    color: "#7B3FE4"
  }
};

// update with your contract address
// const deployedContractAddress = "0x1C30DC7674e5Fd4f6154152E018b92ff29E66B41";
// const deployedContractAddress = "0x45bA70cf965CeB9AFA556a078B694148f2218Cb3";

const deployedContractAddress = "0x7E0350cD1918431f8d19D1a4768c79aA886d71c0";

// more info on query based requests: https://0xpolygonid.github.io/tutorials/wallet/proof-generation/types-of-auth-requests-and-proofs/#query-based-request
// qrValueProofRequestExample: https://github.com/0xPolygonID/tutorial-examples/blob/main/on-chain-verification/qrValueProofRequestExample.json
const qrProofRequestJson = {
  id: "7f38a193-0918-4a48-9fac-36adfdb8b542",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  thid: "7f38a193-0918-4a48-9fac-36adfdb8b542",
  body: {
    reason: "airdrop participation",
    transaction_data: {
      contract_address: deployedContractAddress,
      method_id: "b68967e2",
      chain_id: 80002,
      network: "polygon-amoy"
    },
    scope: [
      {
        id: 1,
        circuitId: "credentialAtomicQuerySigV2OnChain",
        query: {
          allowedIssuers: ["*"],
          context:
            // "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json/KYCAgeCredential-v4",
            "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld",
          credentialSubject: {
            birthday: {
              $lt: 20020101
            }
          },
          type: "KYCAgeCredential"
        }
      }
    ]
  }
};

export default class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div style={styles.root}>
        <h2 style={styles.title}>
          Claim an ERC20 zk airdrop on Polygon Mumbai
        </h2>
        <p>
          Age verification: You must prove your date of birth was before Jan 1,
          2001 to claim.
        </p>
        <p>
          Complete age verification by issuing yourself a Polygon ID claim via{" "}
          <a
            href="https://polygontechnology.notion.site/Issue-yourself-a-KYC-Age-Credential-claim-a06a6fe048c34115a3d22d7d1ea315ea"
            target="_blank"
          >
            KYC Age Credentials
          </a>{" "}
          then scan QR code within Polygon ID app to claim tokens
        </p>

        <div>
          <QRCodeSVG
            level="Q"
            style={{ width: 256 }}
            value={JSON.stringify(qrProofRequestJson)}
          />
        </div>
        <br />
        <p>
          Github:{" "}
          <a
            href="https://github.com/oceans404/tutorial-examples/tree/main/on-chain-verification"
            target="_blank"
          >
            On-chain verification tutorial
          </a>
        </p>
        <p>
          Polygonscan:{" "}
          <a
            // href={`https://mumbai.polygonscan.com/token/${deployedContractAddress}`}
            href={`https://www.oklink.com/amoy/${deployedContractAddress}`}
            target="_blank"
          >
            Token ERC20zkAirdrop
          </a>
        </p>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
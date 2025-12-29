import { useState } from 'react';
import { VinData, VinNaming, VinDataLength } from './VinData';

interface DecodedField {
    raw: string;
    name: string;
    value: string;
}

function VinDecoder()
{
    const [vin, setVin] = useState('');
    const [success, setSuccess] = useState<boolean | null>(null);
    const [decodedData, setDecodedData] = useState<DecodedField[]>([]);
    const vinChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVin(event.target.value);
    }
    const inputResetHandler = () => {
        setSuccess(true);
    }

    function decodeVin()
    {
        setSuccess(vin.length === 32);
        if (vin.length !== 32) return;
        let data = new Array<string>(25);
        let cursor = 0;

        for (let i = 0; i < 25; i++)
        {
            console.log(VinDataLength[i].toString());
            data[i] = vin.substring(cursor, cursor + VinDataLength[i]);
            cursor += VinDataLength[i];
        }

        let decodedFields = new Array<DecodedField>(data.length);
        for (let i = 0; i < data.length; i++)
        {
            console.log(data[i]);
            if (VinData[i] !== null)
            {
                decodedFields[i] = {
                    raw: data[i],
                    name: VinNaming[i],
                    value: (VinData[i] as any)[data[i]] || 'Unknown'
                };
            }
            if (i === 8) // Special case for serial number
            {
                decodedFields[i] = {
                    raw: '',
                    name: VinNaming[i],
                    value: data[i]
                };
            }
        }

        setDecodedData(decodedFields);
        console.log(decodedData);
    }

    return (
        <>
        <div className='tab-header no-bg'>
            <input name="vin-input" className={success === false ? "error" : ""} value={vin} onSelect={inputResetHandler} onChange={vinChangeHandler} type="text" maxLength={32} placeholder="Enter VIN here" style={{width: "40%"}} />
            <button onClick={decodeVin}>Decode VIN</button>
        </div>
        <div>
            <table className='vin-table-wrapper vin-table'>
                <thead>
                <tr>
                    <th>Option</th>
                    <th>Digit</th>
                    <th>Selection</th>
                </tr>
                </thead>
                <tbody>
                {decodedData.length > 0 && decodedData.map((field, index) => (
                    <tr key={index}>
                        <td>{field.name}</td>
                        <td>{field.raw}</td>
                        <td>{field.value}</td>
                    </tr>
                ))}
                {decodedData.length === 0 && VinNaming.map((name, index) => (
                    (index !== 0 && <tr key={index}>
                        <td>{name}</td>
                        <td></td>
                        <td></td>
                    </tr>)
                ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default VinDecoder;
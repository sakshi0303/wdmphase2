import base64

def encode_key(key: str) -> str:
    # Encode the key to Base64
    encoded_key_bytes = base64.b64encode(key.encode('utf-8'))
    return encoded_key_bytes.decode('utf-8')

if __name__ == "__main__":
    original_key = 'xxxxx'
    encoded_key = encode_key(original_key)
    print("Encoded Key:", encoded_key)

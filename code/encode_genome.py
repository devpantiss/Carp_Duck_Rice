mapping = {
"A":0,
"C":1,
"G":2,
"T":3
}

def encode(seq):

    encoded = []

    for base in seq:
        encoded.append(mapping.get(base,0))

    return encoded

from Bio.Seq import SeqIO

file = "../datasets/genomes/sars_cov2_sequences.fasta"

sequences = []

for record in SeqIO.parse(file, "fasta"):
    sequences.append(str(record.seq))

print("Total sequences:", len(sequences))
print(sequences[0][:100])
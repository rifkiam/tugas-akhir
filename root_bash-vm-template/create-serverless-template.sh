VM_ID="200"
NAME="serverless"
IMAGE="jammy-server-cloudimg-amd64.img"
IP="10.10.10.50/24"
GATEWAY="10.10.10.1"
USERNAME="ubuntu"
PASSWORD="ubuntu"
SSH_KEY="$HOME/.ssh/id_rsa.pub"
MEMORY="8192"
CORES="5"

qm create "$VM_ID" --name "$NAME" --memory "$MEMORY" --cores "$CORES"

qm importdisk "$VM_ID" "$IMAGE" local-lvm

# Attach the imported disk
qm set "$VM_ID" --scsihw virtio-scsi-pci --scsi0 "local-lvm:vm-$VM_ID-disk-0"

# Continue configuring the VM
qm set "$VM_ID" \
    --net0 virtio,bridge=vmbr1 \
    --ipconfig0 ip="$IP",gw="$GATEWAY" \
    --ide2 local-lvm:cloudinit \
    --boot order=scsi0 \
    --serial0 socket --vga serial0 \
    --sshkey "$SSH_KEY" \
    --ciuser "$USERNAME" --cipassword "$(openssl passwd -6 "$PASSWORD")"
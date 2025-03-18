VM_ID="100"
NAME="standalone"
IMAGE="~/jammy-server-cloudimg-amd64.img"
IP="10.10.10.10/24"
GATEWAY="10.10.10.1"
USERNAME="ubuntu"
PASSWORD="ubuntu"
SSH_KEY="$HOME/.ssh/id_rsa.pub"
MEMORY="1024"
CORES="1"

qm create "$VM_ID"\
        --name "$NAME" \
        --memory "$MEMORY" \
        --cores "$CORES" \
        --net0 virtio,bridge=vmbr1 \
        --ipconfig0 ip="$IP",gw="$GATEWAY" \
        --scsihw virtio-scsi-pci \
        --scsi0 local-lvm:0,import-from="$IMAGE" \
        --ide2 local-lvm:cloudinit \
        --boot order=scsi0 \
        --serial0 socket --vga serial0 \
        --sshkey "$SSH_KEY" \
        --ciuser "$USERNAME" --cipassword="$(openssl passwd -6 "$PASSWORD")"
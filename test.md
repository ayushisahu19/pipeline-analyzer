# Docker Assignement - 2   
### Submitted by: Ayushi Sahu
### Mail id: ayushisahu0512@gmail.com
---
### Q1. What is the relation between an image and a container in docker?  
Ans: A docker image is a read-only template or a blueprint that contains an application with everything it needs to run like code, runtime, libraries, dependencies and configuration.

A docker container is a running (or stopped) instance of an image. It is a light weight isolated process. 

* An image is like a class in programming while a container is like an object created from that class.

* One image can be used to create many containers and each container runs independently of the others, even though they all started from the same image. 

* Containers can be started, stopped, restarted, and deleted without affecting the original image.
  
### Q2. List all the images and the containers in the system.
Ans:  
List all images 
``` 
docker images
```
Output:

| IMAGE | IMAGE ID | DISK USAGE | CONTENT SIZE |
|---|---|---|---|
| myapp:v1.0 | 8c5eeea0c680 | 186MB | 45.6MB |
| pipeline-analyzer-app:latest | 4ce8706f47e6 | 1.79GB | 433MB |
| python-http-server:1.0 | d29f7d4bb03d | 160MB | 40MB |
| registry:2 | a3d8aaa63ed8 | 37.4MB | 10.3MB |

<br>   

List all containers: 
```
docker ps -a
```
Output: 



| Container ID | Image | Status | Ports | Name |
|-------------|--------|--------|--------|------|
| e281deaa2d0d | `python-http-server:1.0` |  Up 4 seconds | `0.0.0.0:8000->8000/tcp` | `myserver` |
| 4b5984970c80 | `myapp:v1.0` |  Exited (255) 31 hours ago | `3000/tcp` | `angry_sammet` |
| 9f62593ce417 | `kindest/node:v1.35.0` |  Up 8 hours | `127.0.0.1:51010->6443/tcp` | `three-tier-control-plane` |
| 84d2e5bfaf8e | `kindest/node:v1.35.0` |  Up 8 hours | `127.0.0.1:61195->6443/tcp` | `devops-cluster-control-plane` |
| 1d54e126a090 | `gcr.io/k8s-minikube/kicbase:v0.0.50` |  Exited (255) 2 months ago | `32768->22`, `32769->2376`, `32770->5000`, `32771->8443`, `32772->32443` | `minikube` |
| 49062faa5714 | `devops-multibranch-pipeline-analyzer-api` |  Exited (255) 2 months ago | `0.0.0.0:5000->5000/tcp` | `pipeline-analyzer-api` |
| 9ef7c6c3a3d0 | `mongo` | Exited (255) 2 months ago | `0.0.0.0:27017->27017/tcp` | `devops-multibranch-pipeline-analyzer-mongodb-1` |

### Q3. Pull the latest image of `nginx` and run it:
a. By naming the container `super-nginx`  
b. By exposing the port on 7001 on the host.  
c. In the detached mode  
d. With the environment variable `NGINX_HOST` set to `vunet.local`  
<br>
Ans:   
Step 1 — Pull the latest nginx image
```
docker pull nginx:latest
```
Output: 
```
latest: Pulling from library/nginx
6376488be516: Pull complete
57b3fbf43092: Pull complete
72c03230f136: Pull complete
41c9f6f90940: Pull complete
c5a7565de4cf: Pull complete
d4dcde3aeeed: Pull complete
80fa08b690ad: Pull complete
9bebb266cee4: Download complete
ce322055c0f5: Download complete
Digest: sha256:608a100c71651bf5b773c89083b4a1ad7ef4b2bd05d7a7e552271e03123692ad
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest
```
Step 2 — Run it with all the required options
```
docker run -d \
  --name super-nginx \
  -p 7001:80 \
  -e NGINX_HOST=vunet.local \
  nginx:latest
```
```
docker ps
```
Output: 
| Container ID | Image | Status | Ports | Name |
|-------------|--------|--------|--------|------|
| f73c06118fb7 | `nginx:latest` | Up 52 seconds | `0.0.0.0:7001->80/tcp` | `super-nginx` |

<br> 

**Explanation of each flag:**
 
| Flag | Purpose |
|---|---|
| `-d` |Run the container in **detached mode** — it runs in the background and returns control of the terminal immediately |
| `--name super-nginx` | Names the container `super-nginx` instead of a random auto-generated name |
| `-p 7001:80` | Maps **host port 7001** to **container port 80** (the default port nginx listens on). Accessing `localhost:7001` on the host now reaches nginx running inside the container |
| `-e NGINX_HOST=vunet.local` | Sets an environment variable `NGINX_HOST` inside the container with the value `vunet.local`.|
| `nginx:latest` | The image from which the container is to be created |
<br>
**Verify it is running:**
 
```
curl localhost:7001
docker exec super-nginx printenv NGINX_HOST
```
<br>
Output: 
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, nginx is successfully installed and working.
Further configuration is required for the web server, reverse proxy,
API gateway, load balancer, content cache, or other features.</p>

<p>For online documentation and support please refer to
<a href="https://nginx.org/">nginx.org</a>.<br/>
To engage with the community please visit
<a href="https://community.nginx.org/">community.nginx.org</a>.<br/>
For enterprise grade support, professional services, additional
security features and capabilities please refer to
<a href="https://f5.com/nginx">f5.com/nginx</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>


### Q4. Get the list of all running containers and stop and remove the nginx container.
List all the running containers: 
```
docker ps 
```
Stop the container:
```
docker stop super-nginx
```
Remove the container: 
```
docker rm super-nginx
```
* docker stop sends a signal to the container, giving it time to shut down gracefully (default 10 seconds) before forcefully killing it with SIGKILL

* docker rm removes a stopped container from the system. It cannot remove a running container thus use -f (force) flag to stop it forcefully and remove it in one step.
<br>

 

### Q5. Create a Docker volume named vunet and run nginx again, attaching the volume to /etc/ in the container

Step 1 — Create the volume
 
```bash
docker volume create vunet
```
 
Step 2 — Run nginx with the volume attached to `/etc/`
 
```bash 
docker run -d \
  --name super-nginx \
  -p 7001:80 \
  -e NGINX_HOST=vunet.local \
  -v vunet:/etc/ \
  nginx:latest
```
 
**Explanation:**
 
* `docker volume create vunet` creates a **named volume** managed by Docker. This volume exists independently of any container's lifecycle, even if the container is deleted, the volume and its data persist. It is good for databases.
 * `-v vunet:/etc/` mounts the volume named `vunet` to the path `/etc/` **inside the container**. This means:
      - The first time the container starts, Docker copies the existing contents of `/etc/` from the image into the volume.
     - Any changes made to `/etc/` inside the container (for example, editing nginx configuration files) are actually being written to the `vunet` volume on the host.
     - If we later run a **different** container and attach the same `vunet` volume to its `/etc/`, it would see the same data.  

Verify the volume is attached:
 
```bash
docker inspect super-nginx
```   
 Ouput : 
```bash
        "Mounts": [
            {
                "Type": "volume",
                "Name": "vunet",
                "Source": "/var/lib/docker/volumes/vunet/_data",
                "Destination": "/etc",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            }
        ], 
```
<br>  

### Q6. Stop and remove the `nginx` container and remove the volume `vunet`
 
```bash
# Stop the container
docker stop super-nginx
 
# Remove the container
docker rm super-nginx
 
# Remove the volume
docker volume rm vunet
```
 
**Explanation:**
- A volume cannot be removed while it is still attached to an existing container (even a stopped one), so the container must be removed first.
- `docker volume rm vunet` permanently deletes the volume and any data stored inside it. This is irreversible. 

Verify cleanup:
 
```bash
docker ps -a          
docker volume ls      
```
Neither super-nginx nor vunet volume shown in output.


### **Question 7, 8, 9 already covered in assignment 1**  
 
### Q10. Why are Docker networks used? Create a Docker network named `vunet`
  
By default, Docker gives every container its own isolated network namespace. Docker networks helps in managing how containers communicate — with each other, with the host, and with the outside world.
 
1. **Container-to-container communication** — Containers on the same custom network can reach each other by container name as Docker provides automatic DNS resolution. For example, an application container can connect to a database container simply using db:5432 instead of needing to know its IP address.
2. **Isolation** — Containers on different networks cannot communicate with each other by default, providing security boundaries between groups of containers (e.g., separating a frontend network from a backend/database network).
3. **Avoiding hardcoded IPs** — Container IP addresses can change every time a container restarts. Networks with built-in DNS mean applications never need to hardcode IPs.
4. **Multi-host networking** — In Docker Swarm or similar setups, custom networks (overlay networks) allow containers running on different physical hosts to communicate as if they were on the same network.
5. **Port management** — Containers on the same custom network can talk to each other directly on their internal ports, without needing to publish those ports to the host with `-p`.  

**Create the network** 
```bash
docker network create vunet
```
 
**Verify it was created:**
 
```bash
docker network ls
```
Output:
```bash 
NETWORK ID     NAME    DRIVER    SCOPE
c5006bbbfa34   vunet   bridge    local
```
 
---
 
### Q11. Create an `nginx` container by attaching the `vunet` network to it
Type this: 
```bash
docker run -d \
  --name nginx-vunet \
  --network vunet \
  nginx:latest
```
 
Explanation:
- `--network vunet` attaches this container to the custom `vunet` network created in the previous step, instead of the default `bridge` network.
- Because this container is on the `vunet` network, any other container also attached to `vunet` can reach it directly using the hostname `nginx-vunet` — Docker's built-in DNS resolves this name to the container's IP automatically. 

Verify the container is connected to the network:
 
```bash
docker network inspect vunet
```
Output:
```
"Containers": {
            "aeb4fe887fceb25f81a1409415f8e4b24e68767760b4aed3139aaf20abbacb81": {
                "Name": "nginx-vunet",
                "EndpointID": "f1723a3f18cc49270bf33e7bf63d3a85f2c4696b74977584e3ebd52bef30b950",
                "MacAddress": "22:ff:99:11:45:73",
                "IPv4Address": "172.20.0.2/16",
                "IPv6Address": ""
            }
        }
```

This shows `nginx-vunet` listed under the `"Containers"` section of the `vunet` network, along with its assigned IP address on that network.
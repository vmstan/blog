---
title: "Host Memory"
slug: "host-memory"
description: "Memory utilization is important in VMware, most of the time it’s the most limiting factor in the virtual to physical consolidation ratio. Often times I’m tasked with assessing how…"
publishedAt: "2013-02-11T18:00:00.000Z"
updatedAt: "2026-06-21T16:33:39.000Z"
author: "Michael Stanclift"
tags: ["vmware", "hardware", "datacenter", "administration"]
draft: false
featured: false
ghostId: "6e2214ea-f80d-4d34-8919-a51e21145bfe"
---

Memory utilization is important in VMware, most of the time it’s the most limiting factor in the virtual to physical consolidation ratio. Often times I’m tasked with assessing how upgradable a physical host’s current memory configuration is. It’s easy to see from the vSphere Client how much memory you have installed in a host, but when you’re upgrading you need to know exactly how that memory is laid our on your motherboard so you can get the most bang for your buck.

There are basically three ways to do this:

1. **Open up the case and see.**  This is going to require downtime (because you wouldn’t open the case while you’re running production systems, right?) This is all well and good because you can just vMotion your virtual machines to another host and shut it down. Problem is, if you’re having memory utilization issues, chances are you’re overcommitting on your hosts, so you’re going to need to shut down virtual machines to do this.
2. **Use an out-of band-management utility like DRAC or iLO.**  Great if your server has them configured, but a lot of people either don’t realize they have these or don’t bother to set them up until someone points out how useful they are. Usually to configure them requires a reboot of the host which means downtime, and I just explained why that’s probably not great in this situation.
3. **SSH into your hosts and run a couple of commands.**  This is what I’m going to explain how to do.

Everything I’m going to show you is documented from the VMware KB. If you’d rather refer to those [go here for ESXi 4.x/5.x](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=2005821) or [go here for ESX 3.x/4.x](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1003587). Make sure you know what version you’re checking, so you can use the right commands.

#### ESXi 4.x/5.x

The first thing you’ll need to do is enable SSH on your hosts. Best practice is to leave SSH off and only turn it on when you need it. You can enable it by opening up the vSphere Client, selecting the Host and Clusters view, and then selecting the host you want to enable SSH on in the left hand window. Select the Configuration tab, and then Security Profile from the options on the left. Under services you’ll see SSH. Click on Properties, select SSH from the list of services, and then press Options. In the window, press Start to enable the SSH service. Leave the settings that ask you about starting this service automatically set to manual. For security, you don’t want SSH turned on all the time. You’ll also get warnings from each host it’s enabled on if you leave it turned on. When we’re done you’ll want to come back here and disable SSH on your host. (Note: If you’ve previously closed port 22 on your ESXi firewall, you’ll need to open that back up. By default the port is open but the service is not running.)

At this point you need to SSH into your host as root. Keep in mind unless you joined your ESXi box to your Active Directory domain, you probably can’t just use your normal network account to get into the host this way. It’s going to be root or another local account you’ve created.

If you’re on Windows, I suggest using [Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html). If you’re on a Mac or Linux box, no need to download anything extra as it’s all built in. Just open up Terminal and away you go.

```bash
ssh root@VMWARE_HOST
```

(I’m normally a Mac user, but I access my work demo lab through a Windows 7 virtual machine running on VMware View. So here is the results from Putty.)

You’ll want to do is navigate to a location you can easily access through the vSphere datastore browser. The reason is we’re going to be running a command and outputting the results to a text file so we can easily get the information we want. I suggest using a local disk on the host, ISO/template datastore or maybe a shared datastore that you use for things like dumping host logs. The output file is going to just a few MBs, so it’s not really critical as long as it’s easily accessible. When we’re done we’re going to delete it from the host.

```bash
cd /vmfs/volumes/YOUR_DATASTORE
```

You’ll notice that the result for your command will change your current directory to something like this: /vmfs/volumes/4ea066d9-d9f09a90-c026–0025b5aa002c — This is normal. Do not be alarmed.

At this point we’re going to run the command that will query the system for all the physical hardware, and export it to a text file.

```bash
cim-diagnostic.sh > YOUR_SERVER_NAME.txt
```

You can call the file after the &gt; whatever you want. Most of the time I keep it unique because I’m going to be doing this command on multiple systems and just want to easily identify which one it came from.

At this point you can go back to the vSphere Client and open up the Datastore Browser on the datastore you ran the command on. You can get to this easily by clicking on the host in Host and Clusters and then under the Summary page, right clicking on the datastore listing and then Browse Datastore.

Use the Datastore Browser to download the file to your desktop. (Right click file &gt; Download)

Now the problem with this file is that Notepad doesn’t know how to handle the way ESXi outputs the file, so when you open it up it looks a little something like this:

I would suggest opening the file in something like [Notepad++](http://notepad-plus-plus.org) which is really far more useful and can read the log file correctly. It’s also helpful for other VMware logs that don’t save whitespace in a way Notepad likes. (Note, Mac users can open the file in TextEdit just fine.)

Run a search within the document and find the section that starts as _Dumping instances of CIM\_PhysicalMemory_. You’ll see the first entry as _Tag = 32.0_ and if you scroll down all the way though the section it’ll go until run out of memory slots. For instance, the server I ran my export on is a Cisco UCS B250 with 46 memory slots, so the last entry will be _32.45_.

The key bits of information here are things _MaxMemorySpeed and Capacity_ if you’re trying to figure out what to buy. Capacity is listed in bytes, so 4294967296 is going to be a 4GB DIMM. There is also lots of other good information in the export such as the position of the DIMM on the motherboard, the node and channel the memory is utilized by, or if the slot is even in use, as well as things like serial numbers and part numbers.

At this point you can delete the file from the host, if you choose, either by utilizing the Datastore Browser or at the SSH session you may still have open.

```bash
rm YOUR_SERVER_NAME.txt
```

Now you can close your SSH session, and turn SSH back off on your host in the same section where you previously turned it on.

#### ESX 3.x/4.x

The method for obtaining this information on ESX is similar to the ESXi method explained above, the only real difference is that the command utilized is different and the output file isn’t as detailed (although it’s much easier to read.)

The first thing we’re going to need to do is enable SSH on the host. On ESX 3.x/4.x, SSH is designed off by default for the root account on an ESX host. The SSH service does not allow root logins. Non-root users are able to login with SSH, which you can then elevate this account to the root user. As an alternative to enabling SSH on your host, you can physically login to the console of the host and run the commands as well.

From [VMware KB 8375637](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=8375637):

> _If you do not have any other users on the ESX host, you can create a new user by connecting directly to the ESX host with VMware Infrastructure (VI) or vSphere Client. Go to the Users & Groups tab, right-click on the Users list and select Add to open the Add New User dialog. Ensure that the Grant shell access to this user option is selected. These options are only available when connecting to the ESX host directly. They are not available if connecting to vCenter Server._

If you’re on Windows, I suggest using [Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html). If you’re on a Mac or Linux box, no need to download anything extra as it’s all built in. Just open up Terminal and away you go.

```bash
ssh root@MWARE_HOST
```

(I’m normally a Mac user, but I access my work demo lab through a Windows 7 virtual machine running on VMware View. So here is the results from Putty.)

After logging in to your host with your regular user account we need to elevate to root user:

```bash
su -
```

You’ll be prompted for your root password. Enter it now.

You’ll want to do is navigate to a location you can easily access through the vSphere datastore browser. The reason is we’re going to be running a command and outputting the results to a text file so we can easily get the information we want. I suggest using a local disk on the host, ISO/template datastore or maybe a shared datastore that you use for things like dumping host logs. The output file is going to just a few MBs, so it’s not really critical as long as it’s easily accessible. When we’re done we’re going to delete it from the host.

```bash
cd /vmfs/volumes/YOUR_DATASTORE
```

You’ll notice that the result for your command will change your current directory to something like this: /vmfs/volumes/4ea066d9-d9f09a90-c026–0025b5aa002c — This is normal. Do not be alarmed.

At this point we’re going to run the command that will query the system for all the physical hardware, and export it to a text file.

```bash
smbiosDump > YOUR_SERVER_NAME.txt
```

You can call the file after the &gt; whatever you want. Most of the time I keep it unique because I’m going to be doing this command on multiple systems and want to easily identify which one it came from.

At this point you can go back to the vSphere Client and open up the Datastore Browser on the datastore you ran the command on. You can get to this easily by clicking on the host in Host and Clusters and then under the Summary page, right clicking on the datastore listing and then Browse Datastore.

Use the Datastore Browser to download the file to your desktop. (Right click file &gt; Download)

Run a search within the document and find the section that starts as _Physical Memory Array_. You should see a summary that lists how many slots the system has, as well as the maximum memory size. Then there will be an entry listed for each memory slot. For instance, on the Dell R710 I ran an export on, there were 18 slots for a maximum of 192GB. If there is memory installed in the slot you’ll see the size of the DIMM, otherwise you’ll see _No Module Installed_ under size.

At this point you can delete the file from the host, if you choose, either by utilizing the Datastore Browser or at the SSH session you may still have open.

```bash
rm YOUR_SERVER_NAME.txt
```

Now you can close your SSH session.

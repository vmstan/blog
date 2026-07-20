---
title: "Using CDP"
slug: "using-cdp"
description: "The other day I was tasked with adding a new VLAN to a customer’s vSphere cluster. The existing network configuration had just the default VM Network setup, with no trunks or tagged port…"
publishedAt: "2013-02-26T18:00:00.000Z"
updatedAt: "2026-06-21T16:35:22.000Z"
author: "Michael Stanclift"
tags: []
draft: false
featured: false
ghostId: "afe47c19-bb84-4b45-a89d-3d1a4ab5b73a"
---

The other day I was tasked with adding a new VLAN to a customer’s vSphere cluster. The existing network configuration had just the default VM Network setup, with no trunks or tagged port groups setup. In this case the customer is in the process of adding a few virtual desktops (Citrix, blah) and wanted a separate DHCP scope for those machines.

In order to setup this VLAN I would need to put each host in maintenance mode, reconfigure the physical switch ports that were providing connectivity to that host from access ports to trunk ports, add tags to the existing VM Network and Service Console, and then provide connectivity to their new VLAN by adding a new port group tagged to that VLAN number.

(Note: if you need to trunk the connection the Service Console/Management Network uses, change the VLAN tag **before** you adjust the physical switch port settings. You’ll lose connectivity to the host temporarily until you change the switch port settings.)

I set about trying to determine where each of the physical NIC ports on the hosts were plugged into their core switch. There are a few options to do this:

1. Hope that the customer has proper documentation of their environment, from the initial setup and any changes that were made, indicating the switch ports. In this case, the customer did not.
2. Hope that the switch has comments that indicate what is physically connected to it. In this case, there were no comments.
3. Physically trace out each connection back to the switches. In this case, we were in the middle of a major winter storm in Kansas City, so I was working remote for the customer.
4. Use networking commands on the switch to attempt to identify what is plugged into each port.

You might expect that the MAC addresses of the vSwitch’s individual NICs would be listed in the results of a “show mac address-table dynamic” on the switch — except they aren’t. You can see the vNIC this way, but not the pNICs.

If you open the vCenter GUI and go to the Configuration &gt; Networking section, next to each of the physical adapters configured in a vSwitch, you’ll see a blue box. Click on it, and if you’re using Cisco switches (and why wouldn’t you) you’ll see all the data about the switch, port, and configuration of the network port.

You’ll also get these results if you’re running on a UCS chassis against a Nexus switch, but in a slightly different format. With the UCS and other blade chassis type systems you can actually find other ways to determine the switch port you’re connected to, but that’s a topic for another blog post (and once I get more experience on the UCS.)

#### What if none of this works?

If all this doesn’t work for you, make sure you’re using Cisco switches. CDP is a proprietary protocol, so your Dell, HP, Juniper, 3Com, Netgear, Trendnet, SuperCheapNet switches are probably going to give you any of this data.

However, as of ESXi 5.0, VMware does support [Link Layer Discovery Protocol](http://en.wikipedia.org/wiki/Link_Layer_Discovery_Protocol) (LLDP), which is the IEEE standardized version of CDP. The problem is they only support it with Distributed vSwitches, which requires Enterprise Plus licensing. A lot of the environments I work in either don’t have that licensing and/or have not adopted Distributed vSwitches. For reasons unknown, VMware does not support LLDP on regular vSwitches. (For more information on how to use LLDP [check out Ivo Beerens’ post](http://www.ivobeerens.nl/2012/05/16/configure-the-link-layer-discovery-protocol-lldp-in-vsphere-5/).)

If you’ve got Cisco equipment, but it’s still not working, make sure CDP is enabled on your hosts. As of ESX 3.5, it should be by default but it may have been disabled. For more information on how to troubleshoot this check out [VMware KB1003885](http://kb.vmware.com/selfservice/microsites/search.do?language=en_US&cmd=displayKC&externalId=1003885).
